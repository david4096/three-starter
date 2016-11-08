import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs';

const canvas = document.getElementById('main');
const engine = new Engine(canvas, true);

const createScene = () => {
  const scene = new Scene(engine);
  const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);

  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, false);

  Mesh.CreateGround('ground1', 6, 6, 2, scene);
  new HemisphericLight('light1', new Vector3(0, 1, 0), scene);

  const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene);
  sphere.position.y = 1;

  return scene;
};

const scene = createScene();

engine.runRenderLoop(() => { scene.render(); });
