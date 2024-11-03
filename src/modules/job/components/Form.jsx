import React, { useEffect, useState } from 'react';
import { Button, InputBox } from '../../../components/formElements/FormElements';

export const Form = ({ onSave = () => { }, init }) => {

    useEffect(() => {
        setFormData(init);
        return () => { }
    }, [init])

    const [formData, setFormData] = useState(init);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="lg:col-span-2 p-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
                <div className="xs:col-span-1">
                    <InputBox name='job_name' onChange={handleChange} value={formData['job_name']} placeholder='Name' />
                </div>
                <div className="xs:col-span-1">
                    <InputBox name='description' onChange={handleChange} value={formData['description']} placeholder='Description' />
                </div>
                <div className="xs:col-span-1 flex items-center p-1">
                    <Button className='mr-1' label="Save" onClick={() => onSave(formData)} />
                </div>
            </div>
        </div>
    )
}
