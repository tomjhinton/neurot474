import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
const THREE = require('three')
import axios from 'axios'
import { Physics, usePlane, useBox } from 'use-cannon'

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))
  return (
    <mesh ref={ref}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
    </mesh>
  )
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const [ref, api] = useBox(() => ({ mass: 1, position: [0, 5, 0], ...props }))
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
//   useFrame(({ clock }) => api.velocity.set(Math.sin(clock.getElapsedTime()) * 0, -1, 0)
// )

  return (
    <mesh
      {...props}
      ref={ref}
      // scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => api.velocity.set(1 * 0, 0, -10)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.mouseMove.bind(this)






  }


  componentDidMount(){
    let arr = []

    for(let i=0;i<4;i++){
      arr.push([])
      for(let j=0;j<4;j++){
        arr[i].push(i.toString()+':'+j)
      }
    }
    // arr = arr.reverse()
    console.log(arr)
    this.setState({arr: arr})

  }

  componentDidUpdate(){



  }

  mouseMove(e){

    //console.log(e)

    // this.setState({bass: `${e.screenX /100000} ${e.screenY /100000} `, scale: `${e.screenY /2}` })
  }




  render() {
    console.log(this.state)


    return (
      <div onMouseMove={this.mouseMove} className="body">
        <Canvas>
          <Physics>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Plane position={[-1, -1, -1]}/>
            {this.state.arr && this.state.arr.map((x,index)=>{
              return(
                x.map((y,indexY)=>{
                  return(
                  <Box position={[index, indexY, 0]} key={index+':'+indexY} />
                  )
                })
              )
            })}
          </Physics>
        </Canvas>


      </div>




    )
  }
}
export default Main
