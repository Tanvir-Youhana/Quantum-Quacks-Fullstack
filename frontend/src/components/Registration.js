import React from 'react';
import { useState, useEffect } from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from 'yup';

export default function Registration() {
    const intialValues= {
        username: "",
        password: "",
    };

    const validationSchema= Yup.object().shape({
        Username: Yup.string().min(3).max(15).required(),
        Password: Yup.string().min(4).max(20).required(),
    });

    const onSubmit=() => {};


    return (
        <div>
            <Formik
            intialValues= {intialValues}
            onSubmit={onSubmit}
            validationSchema = {validationSchema}
            >
                <Form className= "fromContainer">
                    <label> Username: </label>
                    <ErrorMessage name="username" component= "span" />
                    <Field
                    autocomplete= "off"
                    id= "inputCreatePost"
                    name= "username"
                    placeholder= "(Ex. John123...)"
                    />

                    <label> Password: </label>
                    <ErrorMessage name="password" component= "span" />
                    <Field
                    autocomplete= "off"
                    id= "inputCreatePost"
                    name= "password"
                    placeholder= "Your password..."
                    />
                    <button type= "submit"> Create Account</button>
                </Form>
            </Formik>
        </div>
    )
}

