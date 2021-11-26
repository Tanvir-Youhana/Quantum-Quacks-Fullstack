import React, {useState, setState} from 'react'

function Navbar(){
    return(
    <div className="navbar__wrapper">
        <div className="navbar-search">
            <input placeholder="Search" type="text" />
        </div>
    </div>
    )
}

export default Navbar;