import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
// student
import Index from '../page/student/Index';
import Create from '../page/student/Create';
import Detail from '../page/student/Detail';
import Edit from '../page/student/Edit';

// subject
import { Index as IndexSubject } from '../page/subject/Index';
import { Create as CreateSubject } from '../page/subject/Create';
import { Detail as DetailSubject } from '../page/subject/Detail';
import { Edit as EditSubject } from '../page/subject/Edit';

// register
import { Index as IndexRegister } from '../page/register/Index';
import { Create as CreateRegister } from '../page/register/Create';
import { Detail as DetailRegister } from '../page/register/Detail';
import { Edit as EditRegister } from '../page/register/Edit';
import Login from '../page/auth/Login';
import ProtecedRouter from './ProtecedRouter';
import LoginRouter from './LoginRouter';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* student */}

                    <Route path="" element={<ProtecedRouter><Index /></ProtecedRouter>} />
                    <Route path="/create" element={<ProtecedRouter><Create /></ProtecedRouter>} />
                    <Route path="/student/edit/:slug" element={<ProtecedRouter><Edit /></ProtecedRouter>} />
                    <Route path="/student/:slug" element={<ProtecedRouter><Detail /></ProtecedRouter>} />


                    {/* subject */}
                    <Route path="/subject" element={<ProtecedRouter><IndexSubject /></ProtecedRouter>} />
                    <Route path="/subject/create" element={<ProtecedRouter><CreateSubject /></ProtecedRouter>} />
                    <Route path="/subject/edit/:slug" element={<ProtecedRouter><EditSubject /></ProtecedRouter>} />
                    <Route path="/subject/:slug" element={<ProtecedRouter><DetailSubject /></ProtecedRouter>} />

                    {/* register */}
                    <Route path="/register" element={<ProtecedRouter><IndexRegister /></ProtecedRouter>} />
                    <Route path="/register/create" element={<ProtecedRouter><CreateRegister /></ProtecedRouter>} />
                    <Route path="/register/edit/:slug" element={<ProtecedRouter><EditRegister /></ProtecedRouter>} />
                    <Route path="/register/:slug" element={<ProtecedRouter><DetailRegister /></ProtecedRouter>} />

                    {/* auth */}
                    <Route path="/auth/login" element={<LoginRouter><Login /></LoginRouter>} />

                </Route>
            </Routes>
        </>
    );
}
