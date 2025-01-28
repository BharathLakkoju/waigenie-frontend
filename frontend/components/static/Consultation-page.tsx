'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'

export default function ScheduleConsultation() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-100 to-white">


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8">Schedule a Consultation</h1>
          <Card>
            <CardHeader>
              <CardTitle>Please fill in your details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Select>
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="11am">11:00 AM</SelectItem>
                      <SelectItem value="1pm">1:00 PM</SelectItem>
                      <SelectItem value="3pm">3:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Additional Information</Label>
                  <Textarea id="message" placeholder="Tell us about your project or any specific questions you have." />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Schedule Consultation
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>

    </div>
  )
}