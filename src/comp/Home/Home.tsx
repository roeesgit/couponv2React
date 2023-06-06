import './Home.css'
import video from '../../Assets/videos/happy-children.mp4'
function Home(): JSX.Element {


  const videoUrl = '../../Assets/videos/8OJ9PZR9Q3MVIGVD.mp4';



  return (
    <div className="Home">
      <div className="openning">
        <h1>Welcome!</h1>
        <br />
        <div className="welcome">

          <p> No matter whether you are shopping online or in store, using coupon websites can save you money. </p>
          <br />
          <p> Coupon use is at an all-time high. Studies have found that as many as 96% of shoppers report having used coupons on a purchase. Thanks to free coupon websites and apps like ours, you now have even more options for saving money on products you already buy.</p>
          <br />
          <p> Using coupons 4 you, there’s no reason to pay full price on your next shopping trip. Companies can use this site to offer our customers the latest and greatest merchandise at the best prices.</p>
          <br />
          <p> And you can enjoy all of your favorite products and services, at the best prices. </p>
          <br />
          <p> While in the past the majority of coupons were for grocery and department stores, the categories have expanded. Now, you can find coupons for everything from entertainment to massages and even for your next oil change. </p>
        </div>



      </div>
      <div className="bottomArea">
        <video className="x" controls>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="info">

          <h3>For more information simply press</h3>
          <h3> Ctrl+Alt+Shift+E+Insert+M+End</h3>
          <pre>😂😂😂</pre>
        </div>
      </div>

    </div>
  );
}

export default Home;
