import {OptionFactory, Option} from '.';

export const optionsExample =
  Array.from(Array(20))
    .map((x, index) => OptionFactory.create({id: index, value: `value${index}`}));

optionsExample[2] = OptionFactory.create({id: 2, isDisabled: true, value: `Disabled item`});
optionsExample[5] = OptionFactory.createDivider();
optionsExample[8].value = 'This is a very very very very very long option';
optionsExample[12] = OptionFactory.createDivider({value: 'Divider'});
