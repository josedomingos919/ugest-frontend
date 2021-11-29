import React, { useState } from 'react'

import Avatar from '../../../assets/images/avatar.png'

import { Link } from 'react-router-dom'

import { UseUgest } from '../../view/context'

export default function Aside() {

    const { menu,navigation, setNavigation } = UseUgest()

    const [ navToggle, setNavToggle ] = useState(true)
    const [ menuOn, setMenuOn ] = useState(0)

    const [ submenu, setSubmenu ] = useState([])
    const [submenuActive, setSubmenuActive] = useState(0)
    
    const { pessoa, acesso } = JSON.parse(sessionStorage.getItem('authUser'))

    console.log(pessoa, acesso)


    return (
        <aside style={{
            transition: 'all .3s',
            width: navToggle ? '196px' : '45px'
        }}>
            <div>
                <button onClick={()=>setNavToggle(!navToggle)} className="menuButton">
                    <i className="fa fa-bars"/>
                </button>
            </div>
            <div>
            <div style={{
                opacity: navToggle ? 1 : 0
            }} className="userSectionAside">
                <div>
                    <div>
                        <img src={Avatar} alt="user-img" />
                    </div>
                    <div>
                            <strong>{ pessoa?.pes_nome }</strong>
                        <div>
                                <span>Nível:</span><span>{ acesso?.niv_designacao }</span>
                        </div>
                    </div>
                </div>
            </div>
            { !navToggle && (
                <div style={{
                    opacity: !navToggle ? 1 : 0
                }} className="menuTitle">
                    Menu
                </div>
            ) }
            </div>
            <div>
                <ul>
                    {
                        menu.map(({name,InMenu,route: father_route,icon, childrean},index)=>{
                            return InMenu !== false && (
                                <li onClick={prev => {
                                    prev.stopPropagation();
                                    setMenuOn(index)

                                   if(childrean){

                                        var SubData = {
                                            ...submenu
                                        }

                                        SubData[index] = !submenu[index]

                                        setSubmenu(SubData)
                                    }

                                    if(!childrean)
                                        setNavigation({
                                            menu: name,
                                            route: null
                                        })
                                    else
                                        setNavigation({
                                                ...navigation,
                                                menu: name,
                                                route: father_route,
                                                submenu: navigation.submenu ? navigation.submenu : childrean[0].name
                                            })
                                }} title={name} key={index}>
                                    <Link to={`/${father_route}`} active={menuOn===index?"true":"false"}>
                                    <i className={icon}></i>{name}</Link>
                                    {
                                        childrean && navToggle && <span className="chevron"><i className={`fas fa-chevron-${submenu[index] ? 'up' : 'down'}`}></i></span>
                                    }
                                    {
                                        childrean && <ul style={{
                                            display: submenu[index] ? 'flex' : 'none',
                                            flexDirection: 'column'
                                        }}> {childrean.map(({ name, route , icon },key)=>{
                                            return <li title={name} onClick={(e)=>{
                                                var SubData = {
                                                    ...submenu
                                                }
        
                                                SubData[index] = !submenu[index]
        
                                                setSubmenu(SubData)

                                                setSubmenuActive(key)

                                                setNavigation({
                                                        ...navigation,
                                                        submenu: name,
                                                        route
                                                    })

                                                e.stopPropagation()
                                            }} active={submenuActive===key?"true":"false"} key={key}>
                                                <Link to={`/${father_route}/${route}`}><i className={icon ? icon : "fa fa-arrow-right"}/>{name}</Link>
                                            </li>
                                        })}</ul>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </aside>
    )
}
