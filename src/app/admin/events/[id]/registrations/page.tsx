'use client'
import React from 'react'
import { useGetEventRegistrationsQuery, useGetEventByIdQuery } from '@/redux/api/eventApi'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ArrowLeft, User, Mail, Globe, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'

const EventRegistrationsPage = () => {
    const params = useParams()
    const id = Array.isArray(params.id) ? params.id[0] : params.id

    const { data: eventData } = useGetEventByIdQuery(id as string)
    const { data: regsData, isLoading, error } = useGetEventRegistrationsQuery(id as string)

    if (isLoading) return <div className="p-8">Loading registrations...</div>
    if (error) return <div className="p-8 text-red-500">Error loading registrations</div>

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/events">
                    <Button variant="ghost" size="sm" className="text-gray-500">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
                    </Button>
                </Link>
            </div>

            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Event Registrations</h1>
                {eventData?.event && (
                    <p className="text-lg text-[#7852A9] font-medium">
                        {eventData.event.title}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Registered</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{regsData?.count || 0}</div>
                    </CardContent>
                </Card>
                <Card className="rounded-2xl border-none shadow-sm">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Event Date</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">
                            {eventData?.event ? new Date(eventData.event.date).toLocaleDateString() : '---'}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="rounded-2xl overflow-hidden border-none shadow-sm">
                <CardHeader className="bg-white border-b">
                    <CardTitle className="text-xl">Attendees List</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50">
                                <TableHead className="font-bold">Name</TableHead>
                                <TableHead className="font-bold">Email</TableHead>
                                <TableHead className="font-bold">Country</TableHead>
                                <TableHead className="font-bold">Phone</TableHead>
                                <TableHead className="font-bold text-right">Registered On</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {regsData?.registrations.map((reg) => (
                                <TableRow key={reg._id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell className="font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#7852A9]/10 flex items-center justify-center">
                                                <User className="w-4 h-4 text-[#7852A9]" />
                                            </div>
                                            {reg.name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Mail className="w-3.5 h-3.5 text-gray-400" />
                                            {reg.email}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Globe className="w-3.5 h-3.5 text-gray-400" />
                                            {reg.country}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                                            {reg.phone}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-500 text-right">
                                        {new Date(reg.registeredAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {regsData?.registrations.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-12 text-gray-500">
                                        No registrations yet for this event.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default EventRegistrationsPage
