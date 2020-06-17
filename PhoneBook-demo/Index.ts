import { Control, IControlOptions, TemplateFunction } from 'UI/Base';
import * as template from 'wml!PhoneBook-demo/Index';
import data from './Data';

export default class Index extends Control<IControlOptions> {
    protected _template: TemplateFunction = template;
    protected _phoneBookData: unknown = data;
}
