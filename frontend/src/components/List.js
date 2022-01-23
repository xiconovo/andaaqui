import React from 'react';

export default function List({coordinates}) {
    const executePlaces = async () =>{
        
    }



    const names = ['Tiago' , 'Joao', 'Francisco', 'Ramos', 'Luis', 'Jose',' Jonh Weak', 'Neinas', 'Sarkwer', 'Muski', 'Guerra frontender da Skynew ate te apagas', 'vit', 'Becas', 'Madeira 24 years', 'izquierdo', 'duarte lucas']
    const nameList = names.map(name => <h2>{name}</h2>)
  return (
    <div className='vertical-menu'>
    <h1 className='active'>Places</h1>
        {nameList}
    </div>);
}