# Coding with Python on the Robox
This guide will show you everything you need to program with Python on your Robox!
So you want to graduate from drag-and-drop programming to text-based programming. Well, you are in luck because Roblox supports text-based programming and has a Python library! 

Currently, the support for text-based programming on the website isn’t available (something on the to-do list) but this guide intends to help you as much as possible! The first thing that you want to do is download software to edit code on the Pico, I suggest Thonny (and will be using it as an example throughout the guide but the general principles will be able to be generalised to other editors) but some other apps also work. 

Now when you have the software open you can connect to the pico via the micro USB port. When you open that you are going to see some files (as seen in the picture on the left). 

Generally speaking the file “main.py” is the file that the website uses to communicate, download and edit the pico. So while it is not super relevant to text-based programming I suggest not touching it (unless you want to play around and figure out how Robox works then go for it!), since if that breaks you will most likely need to reflash the Robox firmware onto the Pico (as seen in this guide). 

As for the file “program.py” this is the file I suggest you edit! This is because the Pico will automatically run this file and this won’t break the website code, so edit this to your heart's extent! But how on earth do you get the motors to move? Or read what the line sensors see? Well that’s contained in our mystery file “RoboxLibary.py”

This is a magical file that contains all you need to interface with the sensors and motors. The documentation will be written soon but if you poke around the file to look at the classes it’s pretty self-documenting. 

If you want we can try out an example for you! The program below will make the Robox move forward for 1s, wait 1s then continue that loop 10 times. If that all works then you are set to start editing anything else you want with the program! 