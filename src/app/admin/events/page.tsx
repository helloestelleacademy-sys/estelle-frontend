'use client'
import React from 'react'
import { useGetAllEventsQuery, useDeleteEventMutation } from '@/redux/api/eventApi'
import { Button } from '@/components/ui/button'
import { Calendar, Trash2, Users, Edit, Plus } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const AdminEventsPage = () => {
    const { data: eventsData, isLoading, error } = useGetAllEventsQuery()
    const [deleteEvent] = useDeleteEventMutation()

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this event? This will also delete all registrations.")) {
            try {
                await deleteEvent(id).unwrap()
                toast.success("Event deleted successfully")
            } catch (err) {
                toast.error("Failed to delete event")
            }
        }
    }

    if (isLoading) return <div className="p-8">Loading events...</div>
    if (error) return <div className="p-8 text-red-500">Error loading events</div>

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
                <Button className="bg-[#7852A9] hover:bg-[#603e8a]" disabled>
                    <Plus className="w-4 h-4 mr-2" /> Create New Event (Coming Soon)
                </Button>
            </div>

            <Card className="rounded-2xl overflow-hidden border-none shadow-sm">
                <CardHeader className="bg-white border-b">
                    <CardTitle className="text-xl">All Events</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/50">
                                <TableHead className="font-bold">Event Title</TableHead>
                                <TableHead className="font-bold">Date</TableHead>
                                <TableHead className="font-bold">Location</TableHead>
                                <TableHead className="font-bold">Capacity</TableHead>
                                <TableHead className="font-bold">Status</TableHead>
                                <TableHead className="font-bold text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventsData?.events.map((event) => (
                                <TableRow key={event._id} className="hover:bg-gray-50/50 transition-colors">
                                    <TableCell>
                                        <div className="font-medium text-gray-900">{event.title}</div>
                                        <div className="text-xs text-gray-500 line-clamp-1">{event.subText}</div>
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {new Date(event.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {event.location}
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="w-4 h-4 text-[#7852A9]" />
                                            {event.registeredCount} / {event.capacity || '∞'}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={`capitalize ${event.status === 'upcoming' ? 'border-green-200 bg-green-50 text-green-700' :
                                                event.status === 'cancelled' ? 'border-red-200 bg-red-50 text-red-700' :
                                                    'border-gray-200 bg-gray-50 text-gray-700'
                                            }`}>
                                            {event.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/events/${event._id}/registrations`}>
                                                <Button size="sm" variant="outline" className="text-[#7852A9] border-[#7852A9]/20 hover:bg-[#7852A9]/5">
                                                    <Users className="w-4 h-4 mr-1.5" /> Registrations
                                                </Button>
                                            </Link>
                                            <Button size="sm" variant="outline" className="text-red-600 border-red-100 hover:bg-red-50" onClick={() => handleDelete(event._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {eventsData?.events.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                                        No events found.
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

export default AdminEventsPage
