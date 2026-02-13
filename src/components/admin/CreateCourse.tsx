"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { useCreateCourseMutation } from "@/redux/api/courseApi"

const CreateCourse = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [price, setPrice] = useState('')
  const [level, setLevel] = useState('Beginner level')
  const [courseType, setCourseType] = useState('Basic')
  const [imageUrl, setImageUrl] = useState('');

  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description || !duration || !imageUrl) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await createCourse({
        title,
        description,
        duration,
        price: Number(price) || 0,
        level,
        courseType,
        image: imageUrl
      }).unwrap();

      toast.success("Course created successfully!");
      // Reset form
      setTitle('');
      setDescription('');
      setDuration('');
      setPrice('');
      setImageUrl('');
    } catch (error: any) {
      console.error("Failed to create course:", error);
      toast.error(error?.data?.message || "Failed to create course");
    }
  }

  return (
    <Sheet>

      <SheetTrigger className="">
        <div className='bg-primary-foreground rounded-2xl flex items-center justify-center px-6 py-3 w-fit'>
          <div className='flex items-center gap-3'>
            <Plus size={30} className='text-xl text-blue-900 cursor-pointer' />
            <p className="text-sm text-neutral-600">Add New Course</p>
          </div>
        </div>
      </SheetTrigger >
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="text-3xl font-semibold">Create a New Course?</SheetTitle>
          <SheetDescription>
            This action is to create a new course, filling in the details of each course.
          </SheetDescription>
        </SheetHeader>
        <form className="px-6 overflow-auto" onSubmit={handleSubmit}>

          <div className="w-full max-h-[350px] overflow-y-auto sm:p-10">

            {imageUrl && <div className="w-full h-[250px] sm:h-[240px] relative mb-4">
              <Image className="w-full h-full object-cover rounded-xl" src={imageUrl} alt="Course Preview" fill unoptimized />
            </div>}
          </div>

          <div className="grid gap-4 ">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 4 Weeks" required />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="price">Price (₦)</Label>
              <Input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input type="url" id="imageUrl" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" required />
            </div>
          </div>
          <Button type="submit" className="bg-[#7851A9] hover:bg-[#664095] mt-10 py-6 w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
            {isLoading ? 'Creating...' : 'Create Course'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateCourse
