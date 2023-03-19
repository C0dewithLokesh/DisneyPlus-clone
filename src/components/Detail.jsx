import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import { collection, getDocs } from "firebase/firestore";

const Detail = () => {
    const { id } = useParams();
    const [ movie, setMovie ] = useState({})

    const fetchMovie = async (ID)=>{
        try{
                const querySnapshot = await getDocs(collection(db, "movies"));
                querySnapshot.forEach(doc => {
                    if(doc.id === ID){
                        return setMovie((doc.data()));
                    }
                });
        }catch(error){
            alert(error.message)
        }
    };

    useEffect(() => {
        fetchMovie(id);

        return () => {
            setMovie({});
          };

    }, [id])

    console.log(movie)

  return (
    <Container>
        {
            movie && (
                <>
                    <Background>
                        <img src={movie.backgroundImg} alt="" />
                    </Background>

                    <ImageTitle>
                        <img src={movie.titleImg} alt="" />
                    </ImageTitle>

                    <Controls>
                        <PlayButton>
                            <img src="/images/play-icon-black.png" alt="" />
                            <span>Play</span>
                        </PlayButton>
                        <TrailerButton>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                        </TrailerButton>
                        <AddButton>
                            <span>+</span>
                        </AddButton>
                        <GroupWatchButton>
                            <img src="/images/group-icon.png" alt="" />
                        </GroupWatchButton>
                    </Controls>
                    <SubTitle>
                        {movie.subTitle}
                    </SubTitle>
                    <Description>
                        {movie.description}
                    </Description>
                </>
            )
        }
    </Container>
  )
}

export default Detail

const Container = styled.div`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
` 
const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0; 
    bottom: 0; 
    right: 0; 
    z-index: -1;
    oapacity: 0.7;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`
const ImageTitle = styled.div`
    height: 30vh;
    min-height: 170px;
    width: 35vw;
    min-width: 200px;
    margin-top: 60px;
    margin-bottom: 10px;
    left: 0;

    img {
        width: 100%;
        height : 100%;
        object-fit: contain;
    }
`

const Controls = styled.div`
    display: flex;
    align-items: center;
` 

const PlayButton = styled.button`
    border-radius: 4px;
    font-size: 15px; 
    padding: 0px 24px;
    margin-right: 22px;
    display: flex;
    align-items: center;
    height: 56px;
    background: rgb(249, 249, 249);
    border: none;
    letter-spacing: 1.8px;
    cursor: ponter;
    text-transform: uppercase;

    &:hover {
        background: rgb(198, 198, 198);
    }
` 

const TrailerButton = styled(PlayButton)`
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgb(249, 249, 249);
    color: rgb(249, 249, 249);
` 

const AddButton = styled.button`
    margin-right: 16px; 
    width: 44px;
    height: 44px;
    display: flex:
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid white;
    background-color: rgba(0, 0, 0, 0.6);
    cursor: pointer;

    span {
        font-size: 30px;
        color: white;
    }
` 

const GroupWatchButton = styled(AddButton)`
    display: flex;
    background-color: rgb(0, 0, 0);
` 
const SubTitle = styled.div`
    color: rgb(249, 249, 249);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249);
    max-width: 760px;
`