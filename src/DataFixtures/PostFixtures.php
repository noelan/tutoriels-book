<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\Post;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class PostFixtures extends Fixture implements DependentFixtureInterface
{

    public function load(ObjectManager $manager)
    {
        $difficulties = ['Facile', 'Intermédiaire', 'Diffcile'];
        $categories = ['Sport', 'Food', 'Coding', 'Dessin', 'Musique'];
        $faker = Factory::create('fr_FR');
        /**
         * Création des postes
         */


        for ($j = 0; $j < 100; $j++) {
            $reference = "user" . rand(0, 9);

            $post = new Post();
            $post->setTitle(ucfirst($faker->sentence()))
                ->setDescription(ucfirst($faker->sentence()))
                ->setDifficulty($difficulties[rand(0, count($difficulties) - 1)])
                ->setHref("https://www.youtube.com/watch?v=OpUWqlsLic8")
                ->setUser($this->getReference('user' . rand(0, 9)))
                ->setCategory($categories[rand(0, count($categories) - 1)])
                ->setPreRequis("Du pain, Du sel, De la confiture")
                ->setCreatedAt($faker->dateTimeBetween('-1 years'));
            $manager->persist($post);

            $this->addReference("post" . $j, $post);
        }


        $manager->flush();
    }

    public function getDependencies()
    {
        return array(
            UserFixtures::class,
        );
    }
}
