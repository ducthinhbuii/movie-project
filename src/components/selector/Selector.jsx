import React, { useState } from 'react'
import './styles.scss'
import { FaAngleDown } from "react-icons/fa";
import { HiOutlineX } from "react-icons/hi";

export const Selector = ({data, onChange, value}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    // const [selected, setSelected] = useState([]);
    const handleOpenMenu = () => {
        setMenuOpen(!menuOpen);
    }
    const getNameByID = (genres, id) => {
        const res = genres.filter((item) => {
            return item.id === id;
        })
        console.log(res)

        if(res[0].name){
            return res[0].name;
        }
            
    }
    return (
        <div className='selectContainer'>
            <div className="select" >
                <div className="selected">
                    {value.length > 0 ? (
                        value.map((item, index) => {
                        return (
                            <div className="item-select">
                                <span className='item-select-text'>{getNameByID(data?.genres, item)}</span>
                                <div className="delete-icon">
                                    <HiOutlineX onClick={() => {
                                        onChange([...value.slice(0, index), 
                                                    ...value.slice(index + 1)], 'genres')
                                    }}/>
                                </div>
                            </div>
                        )})
                    ) : (
                        <span className='item-select-text'>Select genres</span>
                    )}
                </div>
                {value?.length > 1 &&
                    <div className="delete-all">
                        <HiOutlineX onClick={() => {
                            onChange([], 'genres')
                        }}/>  
                    </div>
                }
                <div className="iconContainer" onClick={handleOpenMenu}>
                    <FaAngleDown />
                </div>
            </div>
            <div className={menuOpen ? 'menu menu-open' : 'menu'}>
                {data?.genres?.filter((item) => !value?.includes(item.id)).map((item) => {
                    return (
                        <div className="option" 
                            key={item.id}
                            onClick={
                                () => {
                                    console.log('onclick')
                                    setMenuOpen(false);
                                    onChange([...value, item.id], 'genres')
                                }
                            }
                        >
                            {item.name}
                        </div>
                    )
                })}
            </div>
        </div>
  )
}
