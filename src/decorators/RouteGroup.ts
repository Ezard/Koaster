import {IRouteGroupOptions} from '../IRouteGroupOptions';
import {Koaster} from '../Koaster';

export function RouteGroup(path: string): Function;
export function RouteGroup(options: IRouteGroupOptions): Function;
export function RouteGroup(arg: string | IRouteGroupOptions): Function {
	if (typeof arg === 'string') {
		return (target: any) => {
			Koaster.addRouteGroup(target.prototype, {path: arg});
		};
	} else {
		return (target: any) => {
			Koaster.addRouteGroup(target.prototype, arg);
		};
	}
}
