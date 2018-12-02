import * as Koa from 'koa';
import {koaster} from '../src/Koaster';
import {SampleRoutes} from './SampleRoutes';

const app = new Koa();

app.use(koaster({
	routes: [
		SampleRoutes
	]
}));

app.listen('3000');
