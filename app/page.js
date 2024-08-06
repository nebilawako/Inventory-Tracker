//Client Sided App
"use client"
import Image from "next/image";
import { useState,useEffect } from "react";
import { firestore } from "@/firebase";
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
// import { getDocs, query } from "firebase/firestore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

export default function Home() {

  {/* helperfunction */}
  const[inventory, setInventory]=useState([])
  const[open,setOpen]=useState([false])
  const[itemName,setItemName]=useState([''])
  
  const updateInventory = async()=> {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    // for every elment in docs add to inv list
    docs.forEach((doc) => {
      //push a new object 
    inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

 
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }
  
  const removeItem = async (item) => {
    //gets item reference
    const docRef = doc(collection(firestore, 'inventory'), item)
    //gets doc ref
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        //no more items left so deletes item
        await deleteDoc(docRef)
      } else {
        //decreases by 1
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }
  //runs updateinv 
  useEffect(() => {
  updateInventory()
  }, [])

  // to open and close
const handleOpen = () => setOpen(true)
const handleClose = () => setOpen(false)

// return (
// <Box width="100vw" height="100vh" display="flex" justifyContent="center">
//   <Typography variant="h1">Inventory Management</Typography>
    

// </Box>
//   )
// }
return (
  <Box
    width="100vw"
    height="100vh"
    display={'flex'}
    justifyContent={'center'}
    flexDirection={'column'}
    alignItems={'center'}
    gap={2}
  >
  
    <Modal open={open} onClose={handleClose}>
      <Box 
        position= "absolute" 
        top="50%" 
        left="50%" 
        
        width={400} 
        bgcolor="white"
        border="2px solid #0000" 
        boxShadow={24} 
        p={4} 
        display="flex" 
        flexDirection="column"
        gap={3}
        sx={{transform: "translate(-50%,-50%)" }}>
        <Typography variant="h6">Add Item</Typography>
        <Stack width="100%" direction="row" spacing={2}>
          <TextField variant="outlined" fullwidth value={itemName} onChange={(e) =>{setItemName(e.target.value)}}>
            
          </TextField>
          <Button variant="outlined" onClick={()=>{
            addItem(itemName)
            setItemName('')
            handleClose


          }}>
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
       {/* <Typography variant="h1">Inventory Management</Typography> */}
       <Button variant="contained" onClick={() => {handleOpen()}}>
        Add New Item
       </Button>
       <Box border="1px solid #333">
        <Box  
          width="800px"
          height="100px"
          display="flex"
          bgcolor="#ADD8E6"
          alignItems="center"
          justifyContent="center"
          >
         <Typography variant="h2" color="#333">
          Inventory Items

         </Typography>
        </Box>
       </Box>
  </Box>
)
}
