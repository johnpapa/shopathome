#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Octokit } from "@octokit/rest";
import { z } from "zod";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize GitHub API client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Create MCP server
const server = new McpServer({
  name: "github-mcp-server",
  version: "1.0.0",
});

// Tool to get repository information
server.registerTool(
  "get_repository",
  {
    title: "Get Repository",
    description: "Get information about a GitHub repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
    },
  },
  async ({ owner, repo }) => {
    try {
      const { data } = await octokit.rest.repos.get({ owner, repo });
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              name: data.name,
              full_name: data.full_name,
              description: data.description,
              language: data.language,
              stars: data.stargazers_count,
              forks: data.forks_count,
              created_at: data.created_at,
              updated_at: data.updated_at,
              clone_url: data.clone_url,
              homepage: data.homepage,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching repository: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool to list repository issues
server.registerTool(
  "list_issues",
  {
    title: "List Issues",
    description: "List issues from a GitHub repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      state: z.enum(["open", "closed", "all"]).optional().describe("Issue state filter"),
      limit: z.number().min(1).max(100).optional().describe("Number of issues to fetch (max 100)"),
    },
  },
  async ({ owner, repo, state = "open", limit = 10 }) => {
    try {
      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state,
        per_page: limit,
      });

      const issues = data.map((issue) => ({
        number: issue.number,
        title: issue.title,
        state: issue.state,
        author: issue.user?.login,
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        body: issue.body,
        labels: issue.labels.map((label) => label.name),
        url: issue.html_url,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(issues, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching issues: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool to get repository contents
server.registerTool(
  "get_file_content",
  {
    title: "Get File Content",
    description: "Get the content of a file from a GitHub repository",
    inputSchema: {
      owner: z.string().describe("Repository owner/organization"),
      repo: z.string().describe("Repository name"),
      path: z.string().describe("File path in the repository"),
      ref: z.string().optional().describe("Git reference (branch, tag, or commit SHA)"),
    },
  },
  async ({ owner, repo, path, ref }) => {
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path,
        ref,
      });

      if (Array.isArray(data)) {
        // Directory listing
        const items = data.map((item) => ({
          name: item.name,
          type: item.type,
          path: item.path,
          size: item.size,
          download_url: item.download_url,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(items, null, 2),
            },
          ],
        };
      } else if (data.type === "file") {
        // File content
        const content = data.encoding === "base64" 
          ? Buffer.from(data.content, "base64").toString("utf-8")
          : data.content;

        return {
          content: [
            {
              type: "text",
              text: content,
            },
          ],
        };
      } else {
        return {
          content: [
            {
              type: "text",
              text: `Content type "${data.type}" not supported for display`,
            },
          ],
        };
      }
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching file content: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Tool to search repositories
server.registerTool(
  "search_repositories",
  {
    title: "Search Repositories",
    description: "Search for GitHub repositories",
    inputSchema: {
      query: z.string().describe("Search query"),
      sort: z.enum(["stars", "forks", "help-wanted-issues", "updated"]).optional(),
      order: z.enum(["asc", "desc"]).optional(),
      limit: z.number().min(1).max(100).optional().describe("Number of results to return (max 100)"),
    },
  },
  async ({ query, sort, order, limit = 10 }) => {
    try {
      const { data } = await octokit.rest.search.repos({
        q: query,
        sort,
        order,
        per_page: limit,
      });

      const repositories = data.items.map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        url: repo.html_url,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              total_count: data.total_count,
              repositories,
            }, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error searching repositories: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GitHub MCP Server running on stdio");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error("Server error:", error);
    process.exit(1);
  });
}