# This is my first project with React.
Deployed link:
https://shiquan35.github.io/Video-Poker/
<br>
<br>
Started learning React in April 2022 and I started and finished Codle in June 2022.
<br>
<br>
## What has been done in Codle
I used:
<br>
- Functional Components
- Hooks (State and Effect)
- Basic CSS

While there are reproductions of Wordle widely available, I came up with the data types for each state and logic validations by myself.
<br>
## Bugs
- When input consists of 2/3 identical digits and actual number contains only 1/2 of that digit, a yellow box instead of a grey box would appear for the positionally correct number.

![image](https://user-images.githubusercontent.com/86793931/177531450-53db20bf-1d3f-4722-94e6-945abcc4e321.png)
<br>
The actual number is 2 0 0, and the first box should have been grey instead of yellow since the other 0s have been correctly guessed as per how Wordle works.
<br>
<br>
## What would I do differently or to improve
1. I am not too happy about using "refreshing" the page to reset the game after its completion. I would like to implement the changing of states to reset the game instead. My reset Modal is in a separate (Child) component. I have learnt that we can pass functions as props, and that would allow me to reset my game from the Modal component by "resetting" the states.
2. Make the game more complete, to store the number of games played, streaks, histogram of number of attempts required, etc.
3. Implement a keyboard like Wordle has, so that Codle can be played smoothly on mobile devices as well.
4. Change the way the grid was created. Presently, I am using a form of `<input type="number">`. I want to experiment creating the grid using `<div>` instead to allow smooth typing; whereby keying in a number will automatically change the focus to the next box, unless I discover a method smoothly change focus with `<input type="number">`.

