import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AlQuranSurah.css';

const AlQuranSurah = () => {
  const [surahData, setSurahData] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [ayahs, setAyahs] = useState([]);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await axios.get('http://api.alquran.cloud/v1/surah');
        setSurahData(response.data.data);
      } catch (error) {
        console.error('Error fetching surah data:', error);
      }
    };

    fetchSurahData();
  }, []);

  const fetchAyahsData = async (surahNumber) => {
    try {
      const response = await axios.get(`http://api.alquran.cloud/v1/surah/${surahNumber}`);
      setAyahs(response.data.data.ayahs);
    } catch (error) {
      console.error('Error fetching ayahs data:', error);
    }
  };

  const handleSurahClick = async (surah) => {
    setSelectedSurah(surah);
    await fetchAyahsData(surah.number);
  };

  return (
    <div className="App">
    <div className="container">
      <h1>Daftar Surah Al-Quran</h1>
            {selectedSurah && (
        <div className="surah-text">
          <h2>{selectedSurah.englishName}</h2>
          <p>{selectedSurah.text}</p>

          <h3>Berbunyi: </h3>
          <ul className="text">
            {ayahs.map((ayah) => (
              <li key={ayah.number}>
                {ayah.text}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ul>
        {surahData.map((surah) => (
          <li key={surah.number} onClick={() => handleSurahClick(surah)}>
            <span className="surah-number">{surah.number}.</span>
            <span className="surah-name">
              {surah.englishName} - {surah.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default AlQuranSurah;




