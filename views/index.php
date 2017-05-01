
         
        <?php include 'header.html'; ?>
        <div id="slideshow">
            <div class="fullwidthbanner-container">
                <div class="revolution-slider rev_slider" style="height: 0; overflow: hidden;">
                    <ul>    <!-- SLIDE  -->
                        <!-- Slide1 -->
                        <li data-transition="zoomin" data-slotamount="7" data-masterspeed="1500">
                            <!-- MAIN IMAGE -->
                            <img src="images/site/slider/slider1.jpg" alt="">
                        </li>
                        
                        <!-- Slide2 -->
                        <li data-transition="zoomout" data-slotamount="7" data-masterspeed="1500">
                            <!-- MAIN IMAGE -->
                            <img src="images/site/slider/slider1.jpg" alt="">
                        </li>
                        
                        <!-- Slide3 -->
                        <li data-transition="slidedown" data-slotamount="7" data-masterspeed="1500">
                            <!-- MAIN IMAGE -->
                            <img src="images/site/slider/slider1.jpg" alt="">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            
        <section id="content">
            
            
            
            
            <div class="feature section"> 
                <div class="container">
                    <div class="row text-center">   <h1>  Feature Of Coin </h1> </div>
                    <br>
                    <div class="row text-center">   <h2> <img src="images/site/t1.png" /> It Is a long establishes fact that a reader will be distracted  </h2> </div>
                    <div class="row text-center">   <h2> <img src="images/site/t1.png" /> It Is a long establishes fact that a reader will be distracted  </h2> </div>
                    <div class="row text-center">   <h2> <img src="images/site/t1.png" /> It Is a long establishes fact that a reader will be distracted  </h2> </div>
                    <div class="row text-center">   <h2> <img src="images/site/t1.png" /> It Is a long establishes fact that a reader will be distracted  </h2> </div>
                    <div class="row text-center">   <h2> <img src="images/site/t1.png" /> It Is a long establishes fact that a reader will be distracted  </h2> </div>
                    
                </div>
                
               
                </div>
            
            
            
            <div class="coin-video">
                <div class="container">
                    <div class="row text-center ">
                        <br>
                        <h1 class="video-heading"> Coin Project Explanation Video </h1>
                    </div>
                    <div class="row">
                        
                        <br>
                       
                       
                        <div class="col-md-6"> 
                        <iframe
src="https://www.youtube.com/embed/XGSy3_Czz8k" width="100%" height="315">
</iframe>
                        </div>
                        <div class="col-md-6">    <iframe width="100%" height="315"
src="https://www.youtube.com/embed/XGSy3_Czz8k">
</iframe>
            </div>
                        
                    </div>
                    
                        <br>
                        <br>
                        <br>
                </div>
            </div>
            
            <div >
                <div class="container">
                    <div class="row text-center">
                        <br>
                        <h1> Coins </h1>
                        <br>
                    </div>
                    <div class="row">
                        <?php for($i=0;$i<=11;$i++) {  ?>
                    <div class="col-sms-4 col-sm-3 col-md-2 text-center">
                        <img src="images/site/c3.jpg" />
                        <h2>Coin</h2>
                        <h3>Rs 100</h3>
                    </div>
                        <?php } ?>
                    </div>
                </div>
            </div>
            
        </section>


        
        
        <?php include 'footer.html'; ?>
   

