import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
import Index from '../page/student/Index';
import { Index as IndexSubject } from '../page/subject/Index';
import Create from '../page/student/Create';
import Detail from '../page/student/Detail';
import Edit from '../page/student/Edit';
export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* student */}
                    <Route path="" element={<Index />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/student/edit/:slug" element={<Edit />} />
                    <Route path="/student/:slug" element={<Detail />} />


                    {/* subject */}
                    <Route path="/subject" element={<IndexSubject />} />

                </Route>
            </Routes>
        </>
    );
}
