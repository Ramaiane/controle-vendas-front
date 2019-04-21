import { IServiceMessage } from './IServiceMessage';

export interface IServiceResponse<T> {
    messages: IServiceMessage[];
    data: T;
}
