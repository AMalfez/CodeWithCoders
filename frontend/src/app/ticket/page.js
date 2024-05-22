"use client";
import React, { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import axios from 'axios';
import { config } from '@/config';

function Ticket() {
    const searchParams = useSearchParams();
    const [loading,setLoading] = useState("Deleting ticket...")
    const ticket_number = searchParams.get('ticket_number');
    useEffect(() => {
      deleteTicket();
    }, [ticket_number])
    const deleteTicket = async()=>{
        const dlt = await axios.delete(`${config.backend}/ticket/delete?ticket_number=${ticket_number}`)
        if(dlt.status===200){
            setLoading("Ticket deleted successfully.")
        }else{
            setLoading("An error occured in deleting ticket.")
        }
    }
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <div className='font-semibold text-3xl '>{loading}</div>
    </div>
  )
}

export default Ticket