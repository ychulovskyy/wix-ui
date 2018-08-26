// import {Autocomplete} from './Autocomplete';
// import Registry from '@ui-autotools/registry';
// import { Option, DividerArgs } from '../DropdownOption';
// import {OptionFactory} from '../DropdownOption/OptionFactory';
// import { generateOptions } from '../DropdownOption/OptionsExample';

// const options = generateOptions((args: Partial<DividerArgs> = {}) => Autocomplete.createDivider(args.value));

// const option1 = OptionFactory.create({value: 'hey'});



// const autocompleteMetadata = Registry.getComponentMetadata(Autocomplete);
// autocompleteMetadata.reactStrictModeCompliant = false;

// autocompleteMetadata
//   .addSim({
//     title: 'Simulation with default props',
//     props: {
//       onSelect: (option: Option) => option.value,
//       onManualInput: (value: string) => `Manual input: ${value}`,
//       onBlur: () => 'Triggered onBlur',
//       onFocus: () => 'Triggered onFocus',
//       onChange: evt => evt.target.value,

//       options: [
//         option1
//       ],

//       initialSelectedId: [
//         {value: [1], label: '[1]'},
//         {value: [1, 2, 3], label: '[1, 2, 3]'}
//       ]
//       inputProps: {"aria-label": 'Start typing to see options'}
//     }
//   });