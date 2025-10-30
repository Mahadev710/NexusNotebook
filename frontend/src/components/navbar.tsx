"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { X, Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <nav className='bg-white shadow-md p-4 z-50'>
        <div className='container mx-auto flex justify-between items-center'>
            <Link href='/' className='text-xl font-bold text-gray-900'>
                The Reading Retreat
            </Link>    
            <div >
                <Button variant='ghost'onClick={()=>setIsOpen(!isOpen)}>
                    {isOpen?(
                        <X className='w-6 h-6'/>
                    ): (
                        <Menu className='w-6 h-6'/>
                    )}
                </Button>
            </div>
            <ul className='hidden md:flex justify-center items-center space'></ul>
        </div>  
    </nav>
  );
};

export default Navbar;
