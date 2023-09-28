import React from "react"
import styles from './Header.module.css'
import fruitsImg from '../../assets/Fruits.png'
import fruitsGif from '../../assets/FruitsGif.gif'


export default function Header(){
    return (
        <header>
            <span className={styles.container}>
                <img className={styles.fruitsImg} src={fruitsImg} alt="" />
                <img className={styles.gif} src={fruitsGif} alt="" />
            </span>
        </header>
    )
}