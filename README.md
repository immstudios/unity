unity
=====

*Pseudolinear broadcast server for next-gen nxtv*

About the project
-----------------

### What is it?

Personalized video stream for lazy people.


### Premises

Czech "On-demand Audiovisual Media Services Act" states:

> on-demand audiovisual media service means an information society service, which is under the
> editorial responsibility of an on-demand audiovisual media service provider and the principal
> objective of which is the provision of programmes to the public in order to inform, entertain or
> educate, which allows for the viewing of programmes at the moment chosen by the user and at his
> individual request on the basis of a catalogue of programmes established by the on-demand
> audiovisual media service provider (hereinafter referred to as the “catalogue of programmes”), 

and "Radio and Television Broadcasting Act" states:

> radio and television broadcasting means the provision of programme units and other broadcasts -  
> arranged within a programme, including services directly related to the programme - by a
> broadcaster to the public via electronic communications networks in a form protected or 
> unprotected by conditional access for the purpose of simultaneous listening/viewing of the 
> programme units and other broadcasts

This software aims to create solution which is not covered by these two definition, thus not
cotrolled by the [council for radio and television broadcasting](http://www.rrtv.cz) nor
collective rights managers.


### About the demo

Broadcasted content is taken from [nxtv](http://www.nxtv.cz) project. 


Prerequisites
-------------

 - ffmpeg /w libx264 and Fraunhofer FDK AAC support 
   (use broadcast-tools [inst.ffmpeg](https://raw.githubusercontent.com/opennx/broadcast-tools/master/inst.ffmpeg.sh) script)
 - gpac 0.5.2 or higher (installed automatically with ffmpeg if installer script is used)
 - python 2.7 / 3.X
 - nginx is definitely useful for production, but not needed for testingn 
