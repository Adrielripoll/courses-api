<h1>Authenticated API</h1>
<h3>Simple api that provides authenticated endpoints</h3>

<table>
    <thead>
      <tr>
        <th>Endpoint</th>
        <th>Http method</th>
        <th>Payload</th>
        <th>Http responses</th>
      </tr>  
    </thead>
    <tbody>
        <tr>
            <td>/register</td>
            <td>POST</td>
            <td>{ name: string, email: string, password: string, passwordConfirm: string }</td>
            <td>201, 409, 422</td>
        </tr>
        <tr>
            <td>/login</td>
            <td>POST</td>
            <td>{ email: string, password: string }</td>
            <td>200, 400</td>
        </tr>
        <tr>
            <td>/auth/courses</td>
            <td>GET</td>
             <td>None</td>
            <td>200</td>
        </tr>
        <tr>
            <td>/auth/courses/{id}</td>
            <td>GET</td>
            <td>None</td>
            <td>200, 404</td>
        </tr>
    </tbody>
</table>

<h2>Data types</h2>

```
User {
  id: UUID
  name: string
  email: string
  password: string
}

Course {
  id: UUID
  title: string
  description: string
  instructor: string
  price: number
  category: Category
}

Category = "Programming" | "Design" | "Business"
```

<h3>Observações: </h3>
<ul>
  <li>
    Esta aplicação não depende de nenhum banco de dados como Postgres ou MongoDB. Foi implementado um banco de dados em memória.
  </li>
  <li>
    Para rodar é necessário instalar as dependências com <code>npm install</code>, criar um arquivo <i>.env</i> e atribuir as mesmas variáveis do arquivos <i>.env.example</i> e após isso, <code>npm run dev</code>.
  </li>
  <li>
    Para executar os testes, é só executar o comando <code>npm run test</code>.
  </li>
</ul>


