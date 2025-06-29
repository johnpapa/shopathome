# GitHub MCP Server

A Model Context Protocol (MCP) server that provides GitHub API integration for AI assistants and applications.

## Overview

The GitHub MCP Server implements the [Model Context Protocol](https://modelcontextprotocol.io) to expose GitHub functionality through a standardized interface. This allows AI assistants and other MCP-compatible applications to interact with GitHub repositories, issues, and other GitHub resources.

## Features

- **Repository Information**: Get detailed information about GitHub repositories
- **Issue Management**: List and browse repository issues
- **File Content Access**: Read file contents and directory listings
- **Repository Search**: Search for repositories across GitHub

## Tools Available

### get_repository
Get information about a specific GitHub repository.

**Parameters:**
- `owner` (string): Repository owner/organization
- `repo` (string): Repository name

**Returns:** Repository metadata including name, description, language, stars, forks, and timestamps.

### list_issues
List issues from a GitHub repository.

**Parameters:**
- `owner` (string): Repository owner/organization
- `repo` (string): Repository name
- `state` (optional): Issue state filter ("open", "closed", "all")
- `limit` (optional): Number of issues to fetch (max 100)

**Returns:** Array of issues with details like title, state, author, labels, and URLs.

### get_file_content
Get the content of a file or directory listing from a GitHub repository.

**Parameters:**
- `owner` (string): Repository owner/organization
- `repo` (string): Repository name
- `path` (string): File or directory path in the repository
- `ref` (optional): Git reference (branch, tag, or commit SHA)

**Returns:** File content as text or directory listing.

### search_repositories
Search for GitHub repositories.

**Parameters:**
- `query` (string): Search query
- `sort` (optional): Sort criteria ("stars", "forks", "help-wanted-issues", "updated")
- `order` (optional): Sort order ("asc", "desc")
- `limit` (optional): Number of results to return (max 100)

**Returns:** Search results with repository information.

## Setup

### Prerequisites

- Node.js 20.x or higher
- GitHub Personal Access Token (for authenticated requests)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory:
   ```bash
   GITHUB_TOKEN=your_github_personal_access_token
   ```

   **Note:** The GITHUB_TOKEN is optional but recommended for higher rate limits and access to private repositories.

### Running the Server

Start the MCP server:

```bash
npm start
```

For development with auto-restart:

```bash
npm run dev
```

## Configuration

The server can be configured through environment variables:

- `GITHUB_TOKEN`: GitHub Personal Access Token for API authentication (optional)

## Usage with MCP Clients

This server implements the Model Context Protocol and can be used with any MCP-compatible client. The server communicates via stdio transport.

Example client configuration:
```json
{
  "name": "github-mcp-server",
  "command": "node",
  "args": ["path/to/github-mcp-server/src/server.js"]
}
```

## Error Handling

The server includes comprehensive error handling for:
- GitHub API rate limits
- Authentication errors
- Repository not found errors
- Network connectivity issues

All errors are returned in a structured format with descriptive messages.

## Contributing

This GitHub MCP Server is part of the Shop at Home project. Contributions are welcome!

## License

MIT License - see the main repository LICENSE file for details.