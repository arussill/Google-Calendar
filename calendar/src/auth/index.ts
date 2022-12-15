
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import { botsUserAuth } from './auth-user'

const server: FastifyInstance = Fastify({})

server.get('/auth', async (request, reply) => {
  reply.send(botsUserAuth())
})

const start = async () => {
  try {
    await server.listen({ port: 3000 })

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()

  // .then(async (auth) => {
  //   console.log(
  //     await findEventsUsers(
  //       auth,
  //       [//"aura.russill@sofka.com.co",],
  //       "juliancamiloalvarez77@gmail.com"],
  //       subHours(new Date(), 100),
  //       addHours(new Date(), 10).toISOString()
  //       // "2022-12-09T12:00:00-05:00",
  //       // "2022-12-09T20:00:00-05:00"
  //     )
  //   )
  //   return auth
  //     }
  // ).then(
  //   createEvent 
  // )
  // .catch(console.error); // then(createEvent)
