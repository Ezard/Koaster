import {IMiddleware} from 'koa-router';

export interface IRouteOptions {
	path?: string;
	action?: IMiddleware;
}
