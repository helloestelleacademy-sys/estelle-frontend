"use client"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"

const CreateCourse = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('')
  const [imageUrl, setImageUrl] = useState<File | null | string>(null);
  const [imageUrlPreview, setImageUrlPreview] = useState('')

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrlPreview(reader.result as string);
        setImageUrl(file); // store the File, not the base64 string
      };
      reader.readAsDataURL(file);
    }
  };



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl || typeof imageUrl === "string") {
      toast.error("Please upload an image.");
      return;
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
            {imageUrlPreview && <div className="w-full h-[250px] sm:h-[240px]">
              <img className="w-full h-full object-cover rounded-xl" src={imageUrlPreview} />
            </div>}
          </div>

          <div className="grid gap-4 ">
            <div className="grid gap-3">
              <Label htmlFor="name">Title</Label>
              <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="bio">Description</Label>
              <Textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="name">Duration</Label>
              <Input id="duration" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </div>



            <div className="grid gap-3">
              <Label htmlFor="logo">Certificate</Label>
              <Input type="file" id="imageUrl" name="imageUrl" onChange={handleImage} />
            </div>
          </div>
          <Button type="submit" className="bg-[#7851A9] hover:bg-[#664095] mt-10 py-6">Create Course</Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

export default CreateCourse
