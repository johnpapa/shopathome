export * from './components';
export * from './model';
import { environment } from './../../environments/environment';

export const API = environment.API || 'api';
