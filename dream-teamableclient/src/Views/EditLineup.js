import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLineup } from '../api/lineupData';
import LineupForm from '../Components/LineupForm';

export default function EditLineup(){
    const { id } = useParams();
    const [editLineup, setEditLineup] = useState({});

    useEffect(() => {
        getLineup(id).then(setEditLineup);
      }, []);

    return(
        <div>
            <LineupForm lineups={editLineup} />
        </div>
    )

}