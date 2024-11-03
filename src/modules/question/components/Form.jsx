import React, { useEffect, useState } from 'react';
import { Button, InputBox, SelectBox, TextArea, SearchSelectBox } from '../../../components/formElements/FormElements';
import { levels, types } from '../constants/UrlConstants';
import { numberToAlphabet } from '../../../service/Utils';

export const Form = ({ onSave = () => { }, init, jobCompo = [] }) => {
    const [formData, setFormData] = useState({});
    const [options, setOptions] = useState({});

    useEffect(() => {
        setFormData({ ...init });
        setOptions(init?.mcq_options);
        return () => { }
    }, [init]);

    const add = () => {
        setOptions(prev => {
            const newKey = Math.max(...Object.keys(prev).map(Number)) + 1;
            return { ...prev, [newKey]: "" };
        });
    }

    const remove = () => {
        setOptions(prev => {
            const lastKey = Math.max(...Object.keys(prev).map(Number));
            const { [lastKey]: _, ...rest } = prev;
            return rest;
        });
    }

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    return (
        <div className="lg:col-span-2 p-4">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3">
                <div className="xs:col-span-1">
                    <SearchSelectBox label="Job Category" options={jobCompo} name='job_id' onChange={handleChange} value={formData['job_id']} />
                </div>
                <div className="xs:col-span-1">
                    <SelectBox label="Type" options={types} name='type' onChange={handleChange} value={formData['type']} />
                </div>
                <div className="xs:col-span-1">
                    <SelectBox label="level" options={levels} name='level' onChange={handleChange} value={formData['level']} />
                </div>
                <div className="xs:col-span-1">
                    <InputBox name='answerOption' onChange={handleChange} value={formData['answerOption']} placeholder='Answer Option' />
                </div>

                <div className="xs:col-span-1 md:col-span-3">
                    <TextArea name='question_name' onChange={handleChange} value={formData['question_name']} placeholder='Question Name' />
                </div>
                <div className="xs:col-span-1 md:col-span-3">
                    <TextArea name='question_answer' onChange={handleChange} value={formData['question_answer']} placeholder='Question Answer' />
                </div>

                {formData['type'] === "MCQ" && <div className="xs:col-span-1 md:col-span-3">
                    <div className='flex justify-end items-center'>
                        <div className='w-6 h-6 bg-green-500 text-purple-50 cursor-pointer justify-center items-center flex mr-2' onClick={() => add()} >+</div>
                        {Object.keys(options)?.length > 1 && <div className='w-6 h-6 bg-red-500 text-purple-50 cursor-pointer justify-center items-center flex' onClick={() => remove()} >-</div>}
                    </div>
                    {Object.entries(options).map(([key, value]) => {
                        return <div key={key} className='grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-3 p-2'>
                            <div className="xs:col-span-1 justify-center flex items-center">
                                <span>{key}</span> :
                            </div>
                            <div className="xs:col-span-2">
                                <InputBox name='mcq_options'
                                    onChange={(name, data) => {
                                        setOptions(prev => {
                                            return { ...prev, [key]: data }
                                        });
                                    }}
                                    value={value} placeholder='Option'
                                />
                            </div>
                        </div>
                    })}
                </div>}

                <div className="xs:col-span-2 flex items-center p-1">
                    <Button className='mr-1 w-full' label="Save" onClick={() => {
                        for (let item in options) {
                            options[numberToAlphabet(item)] = options[item];
                            delete options[item];
                        }
                        let data = { ...formData, mcq_options: options };
                        onSave(data);
                    }} />
                </div>
            </div>
        </div>
    )
}
