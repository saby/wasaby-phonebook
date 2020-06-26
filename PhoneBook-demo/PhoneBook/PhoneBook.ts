import { Control, IControlOptions, TemplateFunction } from 'UI/Base';
import * as template from 'wml!PhoneBook-demo/PhoneBook/PhoneBook';
import { Memory } from 'Types/source';
import { Model } from 'Types/entity';
import { View, IColumn } from 'Controls/grid';
import { IItemAction } from 'Controls/itemActions';
import { Confirmation } from 'Controls/popup';
import { Remover } from 'Controls/list';
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
    protected _itemActions: IItemAction[] = [{
        icon: 'icon-Erase',
        iconStyle: 'danger',
        id: 'delete',
        title: 'Удалить'
    }];

    protected _children: {
        gridView: View & Control;
        listRemover: typeof Remover;
    };

    protected _beforeMount(options?: IPhoneBookOptions): void {
        this._source = new Memory({
            keyProperty: 'key',
            data: options.data
        });
    }

    protected _onAddButtonClick(): void {
        this._children.gridView.beginAdd(null);
    }

    protected _onActionClick(event: unknown, action: IItemAction, item: Model): void {
        // Обрабатываем только action удаления
        if (action.id !== 'delete') {
            return;
        }

        Confirmation.openPopup({
            message: 'Удалить запись?',
            type: 'yesno'
        })
            .then((answer) => {
                if (answer) {
                    this._children.listRemover.removeItems([item.getKey()]);
                }
            });
    }

    protected _isItemActionVisible(action: IItemAction, item: Model): boolean {
        // Обрабатываем только action удаления
        if (action.id !== 'delete') {
            return true;
        }

        /**
         * Не отображаем операцию удаления для вновь добавляемых записей,
         * потому что при редактировании записи ее еще не существует в источнике данных,
         * а значит удаление не имеет смысла.
         * Признак вновь добавленной записи - отсутствие у нее значения, например, ключевого поля
         */
        return !!item.getKey();
    }

    static getDefaultOptions(): IPhoneBookOptions {
        return {
            data: []
        };
    }
}
