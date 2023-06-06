import { useRef, useState } from 'react';
import './Footer.css'
import { MdNextPlan } from 'react-icons/md'
import { FaFacebookF } from 'react-icons/fa'
import { ImTwitter } from 'react-icons/im'
import { FiGithub } from 'react-icons/fi'
import { GrLinkedinOption } from 'react-icons/gr'
import { AiFillInstagram } from 'react-icons/ai'
import { MdOutlineHelp } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { IoLogoWhatsapp } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

export default function Footer(): JSX.Element {
    const index = useRef(17);
    const navi = useNavigate();
    const footerQuotes: [string, string][] = [
        ["The art is not in making money, but in keeping it.", "Proverb"],
        ["'A penny saved is a penny earned.'", " - Benjamin Franklin"],
        ["'Save money and money will save you.", " - Jamaican Proverb"],
        ["'Money, if it does not bring you happiness, will at least help you be miserable in comfort.", " - Helen Gurley Brown"],
        ["'It's not your salary that makes you rich, it's your spending habits.", " - Charles A. Jaffe"],
        ["'Don't save what is left after spending; spend what is left after saving.", " - Warren Buffett"],
        ["'Saving money is a good habit, and it can change your life.", " - Abdul Kalam"],
        ["'A simple fact that is hard to learn is that the time to save money is when you have some.", " - Joe Moore"],
        ["'Save money, and money will save you for a rainy day.", " - Russian Proverb"],
        ["'Financial freedom is available to those who learn about it and work for it.", " - Robert Kiyosaki"],
        ["'Don't tell me what you value, show me your budget, and I'll tell you what you value.", " - Joe Biden"],
        ["'The goal isn't more money. The goal is living life on your terms.", " - Chris Brogan"],
        ["'Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.", " - Ayn Rand"],
        ["'The more you save, the more you have for emergencies, opportunities, and the future.", " - Suze Orman"],
        ["'Save money and invest in yourself. The only investment that will never go bankrupt is yourself.", " - Michelle Obama"],
        ["'The best way to save money is not to lose it.", " - Les Williams"],
        ["'Money grows on the tree of persistence.", " - Japanese Proverb"],
        ["' A budget is telling your money where to go instead of wondering where it went. '", " - John C. Maxwell"],
    ]

    const [refresh, setrefresh] = useState(false)

    const handleRefresh = () => {
        index.current = index.current === 17 ? 0 : ++index.current
        setrefresh(!refresh)

    }
    const handleNotFound = ()=>{
        navi("/page-not-found")
      }

    const handleHelp = () => {
        navi("/help")
    }
    return (
        <div className="Footer">

            <div className="quotesArea">
                <p>{footerQuotes[index.current][0]}</p>
                <span>{footerQuotes[index.current][1]}</span>
            </div>
            
            <div className="refreshArea">
                <MdNextPlan onClick={handleRefresh} className='icon'/>
            </div>

            <div className="supportArea">
                <BiSupport className='icon' onClick={handleNotFound}/>
                <IoLogoWhatsapp className='icon' onClick={handleNotFound}/>
                <MdOutlineHelp className='icon' onClick={handleHelp} />
            </div>

            <div className="socialMediaArea">

                <FaFacebookF className='icon' onClick={handleNotFound}/>
                <ImTwitter className='icon'onClick={handleNotFound} />
                <FiGithub className='icon' onClick={handleNotFound}/>
                <GrLinkedinOption className='icon' onClick={handleNotFound}/>
                <AiFillInstagram className='icon' onClick={handleNotFound}/>
            </div>

        </div>
    )


}