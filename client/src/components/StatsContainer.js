import { useAppContext } from "../context/appContext"
import StatItem from "./StatItem"
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa"
import Wrapper from "../assets/wrappers/StatsContainer"

const StatsContainer = () => {
  const { stats } = useAppContext()
  const defaultStats = [
    {
      title:"pending applications",
      count:stats.pending || 0 ,
      icon:<FaSuitcaseRolling/>,
      color:"#e9b949",
      backgroundColor:"#fcefc7"
    },
    {
      title:"interviews scheduled",
      count:stats.interview || 0 ,
      icon:<FaCalendarCheck/>,
      color:"#647acb",
      backgroundColor:"#e0e8f9"
    },
    {
      title:"jobs declined",
      count:stats.declined || 0 ,
      icon:<FaBug/>,
      color:"#d66a6a",
      backgroundColor:"#ffeeee"
    },
  ]
  return (
    <Wrapper>
    {defaultStats.map((item,idx)=>{
      return <StatItem key={idx} {...item} />
    })}
    </Wrapper>
  )
}

export default StatsContainer