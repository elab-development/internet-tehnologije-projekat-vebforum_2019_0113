import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

function Statistika() {
    const [statistike, setStatistike] = useState({
        ukupan_broj_korisnika: 0,
        ukupan_broj_tema: 0,
        ukupan_broj_objava: 0,
        teme: [],
    });

        useEffect(() => {
            const token = sessionStorage.getItem('token');
            axios.get('http://127.0.0.1:8000/api/statistika', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setStatistike(response.data);
                })
                .catch(error => console.error("There was an error fetching the statistics", error));
        }, []);
    

    const data = {
        labels: statistike.teme.map(tema => tema.naziv),
        datasets: [
            {
                label: 'Broj objava po temi',
                data: statistike.teme.map(tema => tema.objave_po_temi),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    }; 
    return (
        <div className="statistika-container">
          <h2 className="statistika-title">Statistika</h2>
          <div className="statistika-info">
            <p>Ukupan broj korisnika: {statistike.ukupan_broj_korisnika}</p>
            <p>Ukupan broj tema: {statistike.ukupan_broj_tema}</p>
            <p>Ukupan broj objava: {statistike.ukupan_broj_objava}</p>
          </div>
          <Bar data={data} options={options} className="statistika-chart" />
        </div>
      );
      
}

export default Statistika;
