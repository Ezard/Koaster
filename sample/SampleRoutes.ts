import * as Router from 'koa-router';
import {RouteGroup} from '../src/decorators/RouteGroup';
import {DELETE} from '../src/decorators/verbs/DELETE';
import {GET} from '../src/decorators/verbs/GET';
import {POST} from '../src/decorators/verbs/POST';

type Context = Router.IRouterContext;
type Next = () => Promise<any>;

@RouteGroup('/samples')
export class SampleRoutes {

	@POST
	static async createSample(ctx: Context, next: Next) {
	}

	@GET
	static async getSamples(ctx: Context, next: Next) {
		ctx.body = [{
			name: 'Sample 1'
		}, {
			name: 'Sample 2'
		}, {
			name: 'Sample 3'
		}];
	}

	@DELETE('/:id')
	static async deleteSample(ctx: Context, next: Next) {
	}
}
