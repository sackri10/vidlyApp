import React from 'react';
const ListGroup =(props)=>{
    const {lists,selectedList,handleFilterClick}= props;
    return ( 
    <ul className = "list-group">
        < li className = {
           "All" !== selectedList ? "list-group-item" : "list-group-item active"
        }
        onClick = {
            () => handleFilterClick("All")
        } > All Items </li>
        {
           lists.map((list) => (
                        < li className = {
                            list !== selectedList ? "list-group-item" : "list-group-item active"
                        }
                        onClick = {
                            () => handleFilterClick(list)
                        }
                        key = {
                           list
                        }> {list} 
                        </li>  
           ))
        }
    </ul>);
}
export default ListGroup;