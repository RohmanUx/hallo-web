// types.ts
export interface Registration {
    id: number
    name: string
    status: 'approved' | 'pending' | 'rejected'
    eventId: number
  }
  
  export interface Comment {
    id: number
    user: string
    comment: string
  }
  
  export interface Reactions {
    likes: number
    dislikes: number
    ticketsSold: number
  }
  
  export interface Event {
    id: number
    name: string
    description: string
    startDate: string
    endDate: string
    availableSeats: number
    discountVoucher: string
    paymentMethod: 'free' | 'paid'
    price: number
    registrations: Registration[]
    comments: Comment[]
    reactions: Reactions 
    imageUlr: Date 
  }
  