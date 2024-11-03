import React, { useState } from 'react';
import { Button, InputBox, SelectBox } from '../../../components/formElements/FormElements';
import { levels } from '../constants/UrlConstants';

export const Filter = ({ onSearch }) => {
    const init = { question_name: "", type: "", level: "" };
    const [formData, setFormData] = useState(init);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="lg:col-span-2 p-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div className="xs:col-span-2">
                    <InputBox name='question_name' onChange={handleChange} value={formData['question_name']} placeholder='Name' />
                </div>
                <div className="xs:col-span-2">
                    <InputBox name='type' onChange={handleChange} value={formData['type']} placeholder='Type' />
                </div>
                <div className="xs:col-span-2">
                    <SelectBox options={levels} name='level' onChange={handleChange} value={formData['level']} />
                </div>
                <div className="xs:col-span-2 flex items-center p-1">
                    <Button className='mr-1' label="Search" onClick={() => onSearch(formData)} />
                    <Button label="Clear" onClick={() => setFormData({ ...init })} />
                </div>
            </div>
        </div>
    )
}
