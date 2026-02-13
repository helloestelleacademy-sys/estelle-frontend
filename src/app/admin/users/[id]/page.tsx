"use client"
import React from 'react'
import { useParams } from 'next/navigation'
import { useGetUserDetailsQuery } from '@/redux/api/userApi'
import { Loader2, Mail, Phone, Calendar, User, Shield, CreditCard, BookOpen } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const UserDetailsPage = () => {
    const params = useParams();
    const id = params.id as string;
    const { data, isLoading, isError } = useGetUserDetailsQuery(id);

    if (isLoading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (isError || !data?.success) {
        return (
            <div className="container mx-auto py-10 px-4 text-red-500">
                Error loading user details.
            </div>
        )
    }

    const { user, enrollments, payments } = data;

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">{user.firstName} {user.lastName}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-sm">ID: {user._id}</span>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>{user.status}</Badge>
                    <Badge variant="outline">{user.role}</Badge>
                </div>
            </div>

            {/* User Info Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Email</CardTitle>
                        <Mail className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold truncate" title={user.email}>{user.email}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Phone</CardTitle>
                        <Phone className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold">{user.phoneNo || 'N/A'}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Joined</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold">{new Date(user.createdAt).toLocaleDateString()}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Plan</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold uppercase">{user.plan}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Content Grid */}
            <div className="grid gap-8 md:grid-cols-2">

                {/* Enrolled Courses */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="h-5 w-5" />
                            Enrolled Courses
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {enrollments.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No courses enrolled.</p>
                        ) : (
                            <div className="space-y-4">
                                {enrollments.map((enrollment: any) => (
                                    <div key={enrollment._id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                        <div>
                                            <p className="font-medium text-sm">{enrollment.course?.title || 'Unknown Course'}</p>
                                            <p className="text-xs text-muted-foreground">Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                                        </div>
                                        <Badge>{enrollment.progress}%</Badge>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Payment History */}
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Payment History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {payments.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No payments found.</p>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.map((payment: any) => (
                                        <TableRow key={payment._id}>
                                            <TableCell className="text-xs">{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                                            <TableCell className="font-medium">₦{(payment.amount / 100).toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge variant={payment.status === 'success' ? 'default' : payment.status === 'pending' ? 'secondary' : 'destructive'} className="text-[10px]">
                                                    {payment.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default UserDetailsPage
