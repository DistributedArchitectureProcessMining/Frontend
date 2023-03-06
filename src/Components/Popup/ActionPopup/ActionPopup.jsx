import './ActionPopup.scss';
import {useState, useEffect} from 'react';
import { FaRegWindowClose, FaCloudUploadAlt } from 'react-icons/fa';
import Dropdown from '../../Widgets/Dropdown/Dropdown';
import FileInput  from '../../Widgets/FileInput/FileInput';
import PopupHeader from '../../Widgets/PopupHeader/PopupHeader';
import PopupFooter from '../../Widgets/PopupFooter/PopupFooter';
import InputField from '../../Widgets/InputField/InputField';
import HorizontalLine from '../../Widgets/HorizontalLine/HorizontalLine';

function ActionPopup(props) {

    const {
        toggleActionPopupOpen
    } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(1);
    const [dropdownValue, setDropdownValue] = useState(null);

    useEffect(() => {
        setIsLoading(false);
    });

    const Miners = [
        {label: 'miner1', value: 'sv'},
        {label: 'miner2', value: 'en'},
        {label: 'miner3', value: 'au'},
        {label: 'miner4', value: 'dk'},
        {label: 'miner5', value: 'nw'},
        {label: 'miner6', value: 'ge'},
        {label: 'miner7', value: 'fr'},
        {label: 'miner8', value: 'us'},
    ];

    const Repository = [
        {label: 'repository1', value: 'sv'},
        {label: 'repository2', value: 'en'},
        {label: 'repository3', value: 'au'},
        {label: 'repository4', value: 'dk'},
        {label: 'repository5', value: 'nw'},
        {label: 'repository6', value: 'ge'},
        {label: 'repository7', value: 'fr'},
        {label: 'repository8', value: 'us'},
    ];

    const Files = [
        {label: 'file1', value: 'sv'},
        {label: 'file2', value: 'en'},
        {label: 'file3', value: 'au'},
        {label: 'file4', value: 'dk'},
        {label: 'file5', value: 'nw'},
        {label: 'file6', value: 'ge'},
        {label: 'file7', value: 'fr'},
        {label: 'file8', value: 'us'},
    ];

    const Params = [
        {name: 'param1', type: 'string'},
        {name: 'param2', type: 'double'},
        {name: 'param3', type: 'int'},
        {name: 'param4', type: 'string'},
        {name: 'param5', type: 'bool'},
        {name: 'param6', type: 'float'},
    ]

    const getInputType = (param) => {
        switch(param.type){
            case 'string': return 'text';
            case 'int' : return 'number';
            case 'float': return 'number';
            case 'bool': return 'checkbox';
            case 'double': return 'number';
            default: return 'text';
        }
    }

    const onValueChange = (value) => {
        setDropdownValue(value);
    }

    const getNextButtonName = () => {
        return selected === 4 ? 'confirm' : 'next' 
    }

    const getCancelButtonName = () => {
        return selected === 1 ? 'Cancel' : 'Back' 
    }

    const handleNextButtonClick = () => {
        selected !== 4 ? setSelected(selected + 1) : setSelected(selected);
    }

    const handleCancelButtonClick = () => {
        selected !== 1 ? setSelected(selected - 1) : setSelected(selected);
    }

    if(isLoading){
        return (
            <div className="ActionPopup">
                <div>Loading ...</div>
            </div>
        )
    }

    return (
        // <div className='ActionPopup'>
        <div className='Backdrop-modal' 
            onClick = {() => {toggleActionPopupOpen()}}
        >

            <div className='ActionPopup' 
                onClick = {(e) => {e.stopPropagation()}}
            >

                <PopupHeader
                    title = {`New action`}
                    closePopup = {toggleActionPopupOpen}
                />

                <table className='ActionPopup-wizard-steps'>
                        <td className={`ActionPopup-wizard-step ActionPopup-wizard-step-${selected === 1 ? "selected": ""}`}>
                            <span className='ActionPopup-wizard-step-text'>1. Miner</span>
                        </td>
                        <td className={`ActionPopup-wizard-step ActionPopup-wizard-step-${selected === 2 ? "selected": ""}`}>
                            <span className='ActionPopup-wizard-step-text'>2. Inputs</span>
                        </td>
                        <td className={`ActionPopup-wizard-step ActionPopup-wizard-step-${selected === 3 ? "selected": ""}`}>
                            <span className='ActionPopup-wizard-step-text'>3. Parameters</span>
                        </td>
                        <td className={`ActionPopup-wizard-step ActionPopup-wizard-step-${selected === 4 ? "selected": ""}`}>
                            <span className='ActionPopup-wizard-step-text'>4. Repository</span>
                        </td>
                </table>

                {/* ------------------ STEP 1 ------------------ */}

                {selected === 1 ? 
                    <div className='ActionPopup-wizard-step1'>
                        <Dropdown
                            options = {Files}
                            onValueChange = {onValueChange}
                            label = {`Select miner`}
                        />
                    </div>
                : null}

                {/* ------------------ STEP 2 ------------------ */}

                {selected === 2 ? 
                    <div className='ActionPopup-wizard-step2'>

                        <FileInput onChance = {() => {}}/>

                        <Dropdown
                            options = {Files}
                            onValueChange = {onValueChange}
                            label = {`Select file`}
                        />
                    </div> 

                : null}

                {/* ------------------ STEP 3 ------------------ */}

                {selected === 3 ? 
                    <div className='ActionPopup-wizard-step3'>
                        <div className='ActionPopup-wizard-parameter-inputs'>
                            {
                                Params.map((param, index) => {
                                    const type = getInputType(param);
                                    return (
                                        <>
                                        <InputField
                                            key = {index}
                                            label = {param.name}
                                            fieldType = {type}
                                            placeholder = {type}
                                        />
                                        {index < Params.length - 1 ? <HorizontalLine/> : null}
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div> 
                : null}

                {/* ------------------ STEP 4 ------------------ */}

                {selected === 4 ? 
                    <div className='ActionPopup-wizard-step4'>
                        <Dropdown
                            options = {Files}
                            onValueChange = {onValueChange}
                            label = {`Select the destination repository`}
                        />
                    </div> 
                : null}

                <PopupFooter
                    onCancelClick = {handleCancelButtonClick}
                    onNextClick = {handleNextButtonClick}
                    cancelText = {getCancelButtonName()}
                    nextText = {getNextButtonName()}
                />

            </div>

        </div>
        // </div>
    );
}

export default ActionPopup;