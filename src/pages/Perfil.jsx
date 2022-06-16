import useAuth from "../hooks/useAuth";

function Perfil() {
  const { auth } = useAuth();

  return (
    <>
      <main className="p-5 mt-2 d-flex justify-center">
        <div className="md:w-2/3">
        <h1 className="text-3xl text-center pb-12">MI Perfil</h1>
        <img width={100} src={auth.path} />
          <table>
            <tr>
              <th>Nombre </th>
              <th>Contraseña </th>
              <th>Email </th>
              <th>Rol usuario </th>
            </tr>

            <tr>
              <td>{auth.nombre}</td>
              <td>{auth.password|| '**********'}</td>
              <td>{auth.email}</td>
              <td>{auth.role == 'ADMIN' ? 'Administrador' : 'Usuario'}</td>
            </tr>
          </table>
        </div>
      </main>
    </>
  );
}

export default Perfil;
