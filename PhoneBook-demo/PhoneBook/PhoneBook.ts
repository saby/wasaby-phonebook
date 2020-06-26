import { Control, IControlOptions, TemplateFunction } from 'UI/Base';
import * as template from 'wml!PhoneBook-demo/PhoneBook/PhoneBook';
import { Memory } from 'Types/source';
import { View, IColumn } from 'Controls/grid';
import * as columnTemplate from 'wml!PhoneBook-demo/PhoneBook/columnTemplate';
import * as phoneColumnTemplate from 'wml!PhoneBook-demo/PhoneBook/phoneColumnTemplate';

interface IPhoneBookRecord {
    Address: string;
    FIO: string;
    key: number;
    Phone: string;
}

interface IPhoneBookOptions extends IControlOptions {
    data: IPhoneBookRecord[];
}

export default class PhoneBook extends Control<IPhoneBookOptions> {
    protected _template: TemplateFunction = template;
    protected _source: Memory;
    protected _columns: IColumn[] = [{
        displayProperty: 'FIO',
        template: columnTemplate,
        width: '230px'
    }, {
        displayProperty: 'Address',
        template: columnTemplate,
        width: '400px'
    }, {
        displayProperty: 'Phone',
        template: phoneColumnTemplate,
        width: '270px'
    }];

    protected _children: {
        gridView: View & Control;
    };

    protected _beforeMount(options?: IPhoneBookOptions): void {
        this._source = new Memory({
            keyProperty: 'key',
            data: options.data
        });
    }

    static getDefaultOptions(): IPhoneBookOptions {
        return {
            data: []
        };
    }
}
