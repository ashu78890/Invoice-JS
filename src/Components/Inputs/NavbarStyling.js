import styled from "styled-components";
//import LogoImage from "./App-icon-white 1.png"

export const NavbarContainer  = styled.div`
 display: flex;
 flex-direction: column;
 height: 973px;
 width: 132px;  
 position:absolute;
 background-color: #E40247;
 border-radius: 16px;
 //margin-top: 25px;
 margin-left: 22px;


`
export const Logo = styled.div`
background-image:" E:\react_assignments\styleComponent\src\Container\query\icons\App-icon-white 1.png";
background-size: contain;
height: 99px;
width: 99px;
margin-left: 18px;
margin-top: 20px;
border: 2px solid black;
`
export const NavbarItem = styled.div`
display: flex;
flex-direction: column;
width:100%;
height:60px;
//border: 2px solid blue;
margin-top:47px


`
export const NavbarItemImage = styled.div`

 height:30px;
 width: 30px;
 //border:2px solid black;
 align-self: center;
 


`
export const NavbarItemLabel = styled.text`
display: flex;
 color: black;
 font-size: 10px;
 font-weight:bold;
justify-content: center;
font-family:Poppins;
font-weight: 700;
color: #FFFFFF;
;

`