import React, { useState } from 'react';
import { Button, InputBox, SelectBox } from '../../../components/formElements/FormElements';
import { roleCompo } from '../constants/UrlConstants';

export const Filter = ({ onSearch }) => {
    const init = { name: "", email: "", role: "" };
    const [formData, setFormData] = useState(init);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="lg:col-span-2 p-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-4">
                <div className="xs:col-span-2">
                    <InputBox name='name' onChange={handleChange} value={formData['name']} placeholder='Name' />
                </div>
                <div className="xs:col-span-2">
                    <InputBox name='email' onChange={handleChange} value={formData['email']} placeholder='Email' />
                </div>
                <div className="xs:col-span-2">
                    <SelectBox options={roleCompo} name='role' onChange={handleChange} value={formData['role']} />
                </div>
                <div className="xs:col-span-2 flex items-center p-1">
                    <Button className='mr-1' label="Search" onClick={() => onSearch(formData)} />
                    <Button label="Clear" onClick={() => setFormData({ ...init })} />
                </div>
            </div>
        </div>
    )
}
